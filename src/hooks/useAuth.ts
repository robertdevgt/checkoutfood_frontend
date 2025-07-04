import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    });

    if (isError) {
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/login');
    }

    return { data, isError, isLoading }
}