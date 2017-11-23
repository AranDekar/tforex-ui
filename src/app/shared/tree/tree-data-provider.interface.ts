import { Observable } from 'rxjs/Observable';

import * as shared from '../../shared';

export interface TreeDataProvider {
    loadDescendants(node: shared.TreeNode): Observable<shared.TreeNode[]>;
    search(term: string): Observable<shared.TreeNode[]>;
}