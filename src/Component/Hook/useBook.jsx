import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useBook = () => {
    const axiosPublic = useAxiosPublic();
    const {data: books=[], refetch} = useQuery({
        queryKey: ['books'],
        queryFn: async()=>{
            const res = await axiosPublic.get('/book');
            return res.data;
        }
    })
    return [books, refetch];
};

export default useBook;