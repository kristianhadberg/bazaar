import { Button } from "@/components/ui/button";
import useItem from "@/hooks/useItem";
import { useParams } from "react-router-dom";

function ItemDetailPage() {
    const { id } = useParams();

    const { data: item, isLoading, error } = useItem(id!);

    console.log(item);

    return (
        <div className="flex gap-20 flex-row justify-between">
            <div className="basis-5/12">Image</div>
            <div className="basis-6/12">
                <p className="text-xl font-bold">{item?.title}</p>
                <div className="border-t-2 border-b-2 mt-12 pt-6 pb-6">
                    <div>
                        <p className="font-bold">Description</p>
                        <p>{item?.description}</p>
                    </div>
                    <div className="flex justify-between mt-10 items-center">
                        <p className="text-xl">€ {item?.price}</p>
                        <Button>Buy now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemDetailPage;
