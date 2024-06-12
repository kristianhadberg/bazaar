import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAddItem from "@/hooks/useAddItem";
import useAuthStore from "@/store";

function AddItemPage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const { mutate: addItem, isLoading, error } = useAddItem();

    const formSchema = z.object({
        title: z.string().min(2).max(50),
        description: z.string().min(2),
        price: z.coerce.number(),
        seller: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            seller: user?.id,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        addItem(values);
    }

    return (
        <>
            <h1 className="text-3xl font-medium mb-10">Add a new item.</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the title of the item" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a description of the item" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter the price of the item" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Adding item..." : "Submit"}
                    </Button>
                </form>
            </Form>
            {error && <p className="text-red-500">Error: {error.response?.data?.message || error.message}</p>}
        </>
    );
}

export default AddItemPage;