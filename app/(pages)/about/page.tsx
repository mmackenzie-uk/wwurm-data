import { 
    ABOUT_IMG, 
    ABOUT_TITLE, 
    ABOUT_TEXT, 
    ABOUT_CAPTION 
} from "@/app/configuration/wwurm";

export default function About() {
    return (
        <div className="about">
            <section className="section">
                <div className="about-title">
                    <h1>{ABOUT_TITLE}</h1>
                </div>
            </section>
            <section className="section">
                <div className="about-container">
                    <div className="image-wrap"> 
                        <img className="image" src={ABOUT_IMG} />
                    </div> 
                </div>
            </section>
            <section className="section">
                <div className="about-grid">
                    <h2 className="about-caption">{ABOUT_CAPTION}</h2>
                    <div className="about-text">
                    {
                        ABOUT_TEXT.map((src, index) => <p key={index}>{src}</p>)
                    }
                    </div>
                </div>
            </section>
        </div>
    );
  }