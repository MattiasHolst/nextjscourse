import fs from "fs/promises";
import path from "path";

function HomePage(props: {
  products: {
    id: string;
    title: string;
  }[];
}) {
  const { products } = props;
  return (
    <ul>
      {/* <li>Produkt 1</li>
        <li>Produkt 2</li>
        <li>Produkt 3</li> */}

      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return { props: { products: data.products } };
}

export default HomePage;
