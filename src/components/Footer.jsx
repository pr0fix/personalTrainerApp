export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "10px",
            textAlign: "center",
            backgroundColor:"#005c8d",
            color:"white",
            fontSize:"15px"

        }}>Personal Trainer App {year}</footer>
    )
}