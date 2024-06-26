import { Button } from "@/components/ui/button";
import useItem from "@/hooks/useItem";
import { useParams } from "react-router-dom";

function ItemDetailPage() {
    const { id } = useParams();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { data: item, error } = useItem(id!);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="flex gap-20 flex-col md:flex-row justify-between">
            <div className="basis-5/12 item-detail-image-container">
                <img className="item-detail-image" src={`${backendUrl}${item?.image}`} alt={item?.title} />
            </div>
            <div className="basis-6/12">
                <p className="text-xl font-bold">{item?.title}</p>
                <div className="flex">
                    <p className="font-light">Item listed by:</p>
                    <p className="font-medium ml-1">{item?.seller.username}</p>
                </div>
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
