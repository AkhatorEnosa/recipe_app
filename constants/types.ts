export type Recipe = {
    id: any;
    title: any;
    description: string;
    image: any;
    cookTime: string;
    servings: number;
    category: any;
    area: any;
    ingredients: string[];
    instructions: any;
    originalData: any;
};

export type debouncedProps = {
    value: any;
    delay: number;
}