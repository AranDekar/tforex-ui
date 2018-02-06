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

        const regex: RegExp = new RegExp(title.toLowerCase());
        const filterred = items.filter(x => regex.test(x.title.toLowerCase()));
        this.loadLinks(items, filterred);
        filterred.forEach(x => x.searched = true);
        return filterred;
    }

    private loadLinks(all: shared.TreeNode[], filterred: shared.TreeNode[]) {
        for (const item of filterred) {
            // console.log('looking at ', item._id, ' to load');
            if (!item.path) {
                // console.log(item._id, ' is a root item so no need to provide links');
                continue;
            }

            const paths = item.path.split(',');
            // console.log('--- paths are', JSON.stringify(paths));
            for (const path of paths) {
                if (path.length === 0) {
                    continue;
                }

                if (filterred.some(x => x.title === path)) {
                    // console.log(path, ' is already in inputs');
                    continue;
                }

                const link = all.find(x => x.title === path);

                // console.log('------- ', item._id, ' is inserted into input list now')
                filterred.push(link);
            }
        }
        return filterred;
    }
}
