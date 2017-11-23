import { Pipe, Injectable, PipeTransform } from '@angular/core';

import * as shared from '../../shared';
@Pipe({
    name: 'tfrxTreeSearchFilter',
    pure: true,
})
@Injectable()
export class TreeSearchFilterPipe implements PipeTransform {

    public transform(items: shared.TreeNode[], title: string): any {
        items.forEach(x => x.searched = false);

        if (!title) {
            return items;
        }

        let regex: RegExp = new RegExp(title.toLowerCase());
        let filterred = items.filter(x => regex.test(x.title.toLowerCase()));
        this.loadLinks(items, filterred);
        filterred.forEach(x => x.searched = true);
        return filterred;
    }

    private loadLinks(all: shared.TreeNode[], filterred: shared.TreeNode[]) {
        for (let item of filterred) {
            // console.log('looking at ', item._id, ' to load');
            if (!item.path) {
                // console.log(item._id, ' is a root item so no need to provide links');
                continue;
            }

            let paths = item.path.split(',');
            // console.log('--- paths are', JSON.stringify(paths));
            for (let path of paths) {
                if (path.length === 0) {
                    continue;
                }

                if (filterred.some(x => x.title === path)) {
                    // console.log(path, ' is already in inputs');
                    continue;
                }

                let item = all.find(x => x.title === path);

                // console.log('------- ', item._id, ' is inserted into input list now')
                filterred.push(item);
            }
        }
        return filterred;
    }
}