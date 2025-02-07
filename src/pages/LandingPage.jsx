import React from "react";
import { Link } from "react-router";
import BlurText from "../Bits/BlurText/BlurText";
import ShinyText from "../Bits/Shinytext/ShinyText";
import SplashCursor from "../Bits/SplashCursor/SplashCursor";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { MouseIcon } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Voice Dictation",
    description: "Fast accurate note taking with autocorretion, personalized enhancement and note keeping.",
    route: "app/productivity/voice-dictation",
  },
  {
    id: 2,
    title: "Task Reminder",
    description: "Smart reminders and auto scheduling with Google sync and live notifications.",
    route: "app/productivity/task-reminder",
  },
  {
    id: 3,
    title: "Translation",
    description: "Real time Hindi-English translation with voice dictation and bureaucratic context retention.",
    route: "app/productivity/translation",
  },
  {
    id: 4,
    title: "AI Writer",
    description: "AI powered quick speech and password protected private communication.",
    route: "app/productivity/ai-writer",
  },
];

function LandingPage() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <>
      <section className="min-h-screen flex flex-col bg-[#e1e1e1] justify-center items-center gap-11">
        <BlurText
          text="ADHICRAT"
          delay={150}
          animateBy="letters"
          direction="bottom"
          // onAnimationComplete={handleAnimationComplete}
          className="text-6xl md:text-9xl text-[#1e1e1e] samarkan"
        />
        <Link
          to="/app"
          className="bg-zinc-900 border-2 border-zinc-400 px-4 py-2 rounded-4xl"
        >
          <ShinyText
            text="Get Started"
            disabled={false}
            speed={3}
            className="text-sm md:text-lg"
          />
        </Link>
        {/* <MouseIcon className="absolute bottom-11 scroll-down"/> */}
        <SplashCursor />
      </section>
      <section className="h-screen p-6 bg-[#1e1e1e] text-[#e1e1e1] flex flex-col items-center justify-center gap-y-11">
        <Typography variant="h4">Productivity</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 4,
              width: "90%",
              maxWidth: "600px", 
              padding: "1rem", 
            }}
          >
            {cards.map((card, index) => (
            <Link to={card.route}>
              <Card
                sx={{ display: "flex", justifyContent: "center" }}
                key={index}
              >
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? "" : undefined}
                  sx={{
                    height: "100%",
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.selectedHover",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ height: "100%" }}>
                    <Typography variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
            ))}
          </Box>
        </Box>
      </section>
    </>
  );
}

export default LandingPage;
