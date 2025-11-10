export type Recipe = {
    youtubeUrl?: any;
    id?: number;
    recipeId?: any;
    title?: any;
    description?: string | undefined;
    image?: any;
    cookTime?: string | undefined;
    servings?: number | undefined;
    category?: any;
    area?: any;
    ingredients?: string[] | undefined;
    instructions?: any;
    originalData?: any;
};

export type debouncedProps = {
    value: any;
    delay: number;
}