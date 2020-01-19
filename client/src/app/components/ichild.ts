export interface IChild {
    location: {left: string, top: string};
    ancestry: number[];
    type: string;
    children: any[];
    path: string;
    name: string;
    description: string;
    index: number;
    iconPath: string;
}
