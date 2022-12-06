import { ReactFlowProvider } from "reactflow"
import CustomDNDFlow from "../components/CustomDNDFlow"

const Flow = () => {
    return(
        <>
            <ReactFlowProvider>
                <CustomDNDFlow/>
            </ReactFlowProvider>
        </>
    )
}

export default Flow