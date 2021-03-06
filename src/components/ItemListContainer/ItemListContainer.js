import { useEffect, useState } from "react"
import { ItemList } from "../ItemList/ItemList"
import {Loader} from "../pages/Loader"
import { useParams } from 'react-router-dom'
import { db } from "../firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"


export const ItemListContainer = () => {


    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(false)

    const { catId } = useParams()

    useEffect(() => {
        setLoading(true)

        // 1.- armar referencia
        const productosRef = collection(db, 'productos')
        const q = catId ? query(productosRef, where("categoria", "==", catId)) : productosRef
        // 2.- pedir esa ref
        getDocs(q)
            .then((resp) => {
                setProductos(resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                }))
            })
            .finally(() => {
                setLoading(false)
            })

    }, [catId])


    return (
        <>
            {
                loading
                    ? <Loader/>
                    : <ItemList productos={productos} />
            }
        </>
    )
}