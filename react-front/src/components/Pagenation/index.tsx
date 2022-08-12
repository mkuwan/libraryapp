import ReactPaginate, {ReactPaginateProps} from "react-paginate";

const defaultProps: ReactPaginateProps = {
    pageCount: 0,
}

export const Pagenation = (props: ReactPaginateProps) => {

    return(
        <>
            <ReactPaginate {...props}/>
        </>
    )
}

export default Pagenation;