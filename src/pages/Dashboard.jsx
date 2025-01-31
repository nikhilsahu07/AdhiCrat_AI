import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const cards = [
  {
    id: 1,
    title: "Voice Dictation",
    description: "Plants are essential for all life.",
    route: "productivity/voice-dictation",
  },
  {
    id: 2,
    title: "Task Reminder",
    description: "Animals are a part of nature.",
    route: "productivity/task-reminder",
  },
  {
    id: 3,
    title: "Translation",
    description: "Humans depend on plants and animals for survival.",
    route: "productivity/translation",
  },
  {
    id: 4,
    title: "AI Writer",
    description: "Humans depend on plants and animals for survival.",
    route: "productivity/ai-writer",
  },
];
function Dashboard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <div className="flex flex-col h-screen justify-start items-center gap-y-11">
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
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            maxWidth: "800px", // Set a max width to prevent excessive stretching
            width: "100%",
          }}
        >
          {cards.map((card, index) => (
            <Card sx={{ display: "flex", justifyContent: "center" }}>
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
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
