import { Pipe, Injectable, PipeTransform } from '@angular/core';

import * as shared from '../../shared';
@Pipe({
    name: 'tfrxTreeNodeFilter',
    pure: true,
})

@Injectable()
export class TreeNodeFilterPipe implements PipeTransform {
    public transform(items: shared.TreeNode[], node: shared.TreeNode | undefined): any {
        let regex: RegExp;
        if (node === undefined) {
            return items.filter(x => x.path === null);
        } else if (node.path == null) {
            regex = new RegExp('^,' + node.title + ',$');
        } else {
            regex = new RegExp('^' + node.path + node.title + ',$');
        }
        let filterred = items.filter(x => x.path && regex.test(x.path));
        return filterred;
    }
}