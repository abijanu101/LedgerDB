import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function Products() {
    const [branches, setBranches] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setBranches([
            "Main Branch",
            "New Branch"
        ]);

        setProducts([
            {
                id: '0',
                name: 'Eggs',
                price: '120',
                stock: ['5', '13'],
                sales: ['45', '15']
            },
            {
                id: '1',
                name: 'Large Milky Bread',
                price: '150',
                stock: ['20', '1'],
                sales: ['23', '0']
            }
        ]);
    }, [])

    return (
        <>
            <main className="p-2 w-full">
                <header className="flex gap-5 align-bottom border-b-2 border-teal-800 mb-5 pb-2  ">
                    <h1 className="flex-1 text-3xl"> Products</h1>
                    <div className="flex gap-2">
                        <input type="text" id="srch" placeholder="Search for Products" className="border-2 p-2 text-sm rounded-md border-teal-800 text-teal-950 w-80" />
                        <FaSearch className="text-2xl text-teal-700 mt-1.5" />
                    </div>
                </header>

                <table className="table w-full text-base">
                    <thead className="bg-gradient-to-br from-teal-700 to-cyan-800 text-teal-100 table-row-group border-1 border-teal-700">
                        <tr className="table-row">
                            <th className="text-lg p-2" rowSpan={2}>Name</th>
                            <th className="text-lg p-2" rowSpan={2}>Price</th>
                            <th className="p-2" colSpan={branches.length}>Stock</th>
                            <th className="p-2" colSpan={branches.length}>Sales</th>
                        </tr>
                        <tr className="table-row">
                            {branches.map((branch, i) => <th className="p-2" key={i}>{branch}</th>)}
                            {branches.map((branch, i) => <th className="p-2" key={i}>{branch}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, i) =>
                            <tr key={i}>
                                <DataCell data={product.name} clickable={true}/>
                                <DataCell data={product.price} clickable={true}/>
                                {product.stock.map((branch, j) => <DataCell key={j} data={branch}/>)}
                                {product.sales.map((branch, j) => <DataCell key={j} data={branch} />)}
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
        </>
    );
}

function DataCell({ data, clickable = false }) {
    return (
        <td className={"p-1.5 border border-teal-700 " + (clickable ? "hover:bg-cyan-50 cursor-text" : "hover:bg-gray-200 cursor-not-allowed")}>
            {data}
        </td>
    );
}

export default Products;