import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCategories from "@/hooks/useCategories";
import useAddAuction from "@/hooks/useAddAuction";
import { useRef } from "react";

function AddAuctionPage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const ref = useRef<HTMLInputElement>(null);

    const { mutate: addAuction, isLoading, error } = useAddAuction();
    const { data: categories } = useCategories();

    const formSchema = z.object({
        title: z.string().min(2).max(50),
        description: z.string().min(2),
        startingPrice: z.coerce.number(),
        seller: z.string(),
        category: z.string(),
        image: z.instanceof(File).optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            startingPrice: 0,
            seller: user?.id,
            category: "",
            image: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("startingPrice", values.startingPrice.toString());
        formData.append("seller", values.seller);

        const endDateString = ref?.current?.value;
        const dateParsed = Date.parse(endDateString!);
        const endDate = new Date(dateParsed);
        const endDateIso = endDate.toISOString();

        formData.append("endTime", endDateIso);
        formData.append("category", values.category);

        if (values.image) {
            formData.append("image", values.image);
        }

        console.log(formData);

        addAuction(formData, {
            onSuccess: () => {
                navigate("/auctions");
            },
        });
    }

    return (
        <>
            <h1 className="text-3xl font-medium mb-10">Add a new auction.</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the title of the auction" {...field} />
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
                                    <Input placeholder="Enter a description of the auction" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startingPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Starting price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Enter the starting price of the auction" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="endTime"
                        render={() => (
                            <FormItem>
                                <FormLabel>End time</FormLabel>
                                <FormControl>
                                    <Input ref={ref} type="datetime-local" placeholder="Enter the end time of the auction" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories?.results?.map((c) => (
                                                    <SelectItem key={c._id} value={c.name}>
                                                        {c.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        placeholder="Upload your image"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            form.setValue("image", file);
                                        }}
                                    />
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

export default AddAuctionPage;
