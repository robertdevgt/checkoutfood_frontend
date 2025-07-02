type Props = {
    children: React.ReactNode;
};

export default function ErrorMessage({ children }: Props) {
    return (
        <div className="mt-2 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md px-3 py-2">
            {children}
        </div>
    );
}
