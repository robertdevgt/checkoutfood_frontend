import { motion } from 'framer-motion';

type Props = {
    children: React.ReactNode;
    show: boolean;
};

export default function ShowContentFromRight({ children, show }: Props) {
    return (
        <motion.div
            className={`${show ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, x: 50 }}
            animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
}
