import Button from "react-bootstrap/esm/Button"
import { Link } from "react-router-dom"

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>HeroBanner</h3> 
        <img src="" alt="img-banner" className="hero-banner-image" />

        <div>
            <Link to={`/product/ID`}>
                <Button type="button">BUTTON TEXT</Button>
            </Link>
            <div className="desc">
                <h5>Description</h5>
                <p>DESCRIPTION</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner