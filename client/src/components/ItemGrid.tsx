import useItems from "@/hooks/useItems";

function ItemGrid() {
    const { data: items } = useItems();
    console.log(items);
    return <div>ItemGrid</div>;
}

export default ItemGrid;
