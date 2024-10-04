import Lottie from "lottie-react";
import loading from '../assets/loading.json'
import Container from "@/components/ui/Container";
const Loading = () => {
    return (
        <Container className="w-full h-screen my-0 flex justify-center items-center">
            <Lottie className="w-1/4" animationData={loading} loop={true}></Lottie>
        </Container>
        
    );
};

export default Loading;