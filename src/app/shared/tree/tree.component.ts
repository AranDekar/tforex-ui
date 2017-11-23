import {
    Component, Input, Output, OnChanges, EventEmitter, SimpleChange,
    ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import * as shared from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'tfrx-tree',
    templateUrl: 'tree.component.html',
    styleUrls: ['tree.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TreeComponent {
    @Input() public treeNodes: shared.TreeNode[];
    @Input() public parentNode: shared.TreeNode;
    @Input() public showTree = false;
    @Input() public searchText: string;

    @Output() public selectedItemsChanged = new EventEmitter();

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    private onNodeCollapseExpandClicked(node: shared.TreeNode) {
        node.collapsed = !node.collapsed;
    }

    private isNodeParent(node: shared.TreeNode): boolean {
        let regex;
        if (node.path == null) {
            regex = new RegExp('^,' + node.title + ',$');
        } else {
            regex = new RegExp('^' + node.path + node.title + ',$');
        }
        return this.treeNodes.filter(x => x.path && regex.test(x.path)).length > 0;
    }
    private onSelectedItemsChanged(nodes: shared.TreeNode[]) {
        if (this.parentNode) {
            nodes.unshift(this.parentNode);
        }
        this.selectedItemsChanged.emit(nodes);
    }

    private onClickTracked(en: shared.ClickTracking) {
        switch (en) {
            case shared.ClickTracking.outside:
                this.showTree = false;
                break;
            case shared.ClickTracking.inside:
                this.showTree = true;
                break;
            default:
                break;
        }
    }

    private onNodeClicked(node: shared.TreeNode) {
        this.treeNodes.forEach(x => x.selected = false);
        node.selected = true;
        this.selectedItemsChanged.emit([node]);
    }
}