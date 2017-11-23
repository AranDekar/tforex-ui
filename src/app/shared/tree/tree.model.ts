export interface TreeNode {
    _id: string;
    title: string;
    path: string | null;
    selected?: boolean;
    collapsed?: boolean;
    searched?: boolean;
}