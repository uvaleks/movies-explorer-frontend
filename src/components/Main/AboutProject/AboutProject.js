import './AboutProject.css';

export default function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__section-heading">О проекте</h2>
            <div className="about-project__facts">
                <div className="about-project__fact">
                    <h3 className="about-project__fact-heading">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__fact-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__fact">
                    <h3 className="about-project__fact-heading">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__fact-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__timeline">
                <div className="about-project__milestone about-project__milestone_backend">
                    <div className="about-project__milestone-bar about-project__milestone-bar_backend">1 неделя</div>
                    <p className="about-project__milestone-text">Back-end</p>
                </div>
                <div className="about-project__milestone about-project__milestone_frontend">
                    <div className="about-project__milestone-bar about-project__milestone-bar_frontend">4 недели</div>
                    <p className="about-project__milestone-text">Front-end</p>
                </div>
            </div>
        </section>    
  );
}