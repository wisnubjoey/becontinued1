"use client";

import { Hotel, Room } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import { Button } from "../ui/button";
import { icons, Loader2, XCircle } from "lucide-react";
import axios from "axios";

interface AddHotelFormProps {
  hotel: HotelWithRooms | null;
}

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long.",
  }),
  image: z.string().min(1, {
    message: "Image is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: "Location description must be at least 10 characters long.",
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  pool: z.boolean().optional(),
  laundry: z.boolean().optional(),
});

const AddHotelForm = ({ hotel }: AddHotelFormProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      gym: false,
      spa: false,
      freeWifi: false,
      pool: false,
      laundry: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast({
            variant: "success",
            description: "Image deleted.",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong !.",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  return (
    <>
      <div className="px-4 py-4 max-w-[1920px] w-full mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-lg font-bold">
              {hotel ? "Update Hotel" : "Describe Your Hotel"}
            </h1>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Name</FormLabel>
                      <FormDescription>Provide your hotel name</FormDescription>
                      <FormControl>
                        <Input placeholder="Heaven Hotel..." {...field} />
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
                      <FormDescription>Describe your hotel</FormDescription>
                      <FormControl>
                        <Textarea placeholder="Nice view..." {...field} />
                      </FormControl>
                      <FormMessage />0{" "}
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Facility</FormLabel>
                  <FormDescription>
                    Select the facilities available at your hotel
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <FormField
                      control={form.control}
                      name="gym"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Gym</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="spa"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Spa</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="freeWifi"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Free Wi-Fi</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pool"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Pool</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="laundry"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Laundry</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3">
                      <FormLabel>Upload an image *</FormLabel>
                      <FormDescription>Add image...</FormDescription>
                      <FormControl>
                        {image ? (
                          <>
                            <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                              <Image
                                fill
                                src={image}
                                alt="hotel image"
                                className="object-contain"
                              />
                              <Button
                                onClick={() => handleImageDelete(image)}
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="absolute right-[-12px] top-0"
                              >
                                {imageIsDeleting ? <Loader2 /> : <XCircle />}
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col items-center max-w-[400px] p-12 border-2 border-dashed border-gray-400 rounded mt-4">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  console.log("Files: ", res);
                                  setImage(res[0].url);
                                  toast({
                                    variant: "success",
                                    description: "Image uploaded.",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  toast({
                                    variant: "destructive",
                                    description: `Upload failed. ${error.message}`,
                                  });
                                }}
                              />
                            </div>
                          </>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 flex flex-col gap-6">test</div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddHotelForm;
