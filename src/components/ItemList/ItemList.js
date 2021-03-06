import { useEffect } from "react"
import { Item } from "../Item/Item"


export const ItemList = ({ productos }) => {

    return (
        <>
            <h2 className="text-center p-lg-4 text-uppercase">Productos</h2>
            <hr />
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '100%',
            }}>
                {productos.map((el) => <Item key={el.id} {...el} />)}
            </div>
        </>
    )
}