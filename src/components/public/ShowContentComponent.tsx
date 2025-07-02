import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

type Props = {
    children: React.ReactNode
}

export default function ShowContentComponent({ children }: Props) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) controls.start({ opacity: 1, y: 0 });
    }, [inView]);
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    )
}
