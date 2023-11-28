import React, { useState } from "react";
import {
  Stack,
  Button,
  Box,
  Slider,
  Typography,
  Container,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { find_closest_color } from "color-picker-library";

export const Display = () => {
  const [pickedColor, setPickedColor] = useState({ r: 128, g: 128, b: 128 });
  const [resultColor, setResultColor] = useState({ r: 128, g: 128, b: 128 });
  const [resultName, setResultName] = useState("Gray");

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  function handlePick() {
    const colorObj = find_closest_color(
      pickedColor.r,
      pickedColor.g,
      pickedColor.b
    );
    setResultColor({
      r: colorObj.rgb[0],
      g: colorObj.rgb[1],
      b: colorObj.rgb[2],
    });
    setResultName(colorObj.name);
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack direction="row" spacing={2}>
        <div>
          <Typography variant="h5">Closest Color</Typography>
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: 1,
              bgcolor: rgbToHex(resultColor.r, resultColor.g, resultColor.b),
            }}
          />
          <Typography variant="h6">{resultName}</Typography>
        </div>
        <Box
          component="section"
          sx={{
            width: 300,
            height: 500,
            border: "1px dashed grey",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography variant="body">Red</Typography>
          <Slider
            aria-label="Small steps"
            value={pickedColor.r}
            defaultValue={128}
            step={1}
            min={0}
            max={255}
            valueLabelDisplay="auto"
            onChange={(obj) =>
              setPickedColor({ ...pickedColor, r: obj.target.value })
            }
          />
          <Typography variant="body">Green</Typography>
          <Slider
            aria-label="Small steps"
            value={pickedColor.g}
            defaultValue={128}
            step={1}
            min={0}
            max={255}
            valueLabelDisplay="auto"
            onChange={(obj) =>
              setPickedColor({ ...pickedColor, g: obj.target.value })
            }
          />
          <Typography variant="body">Blue</Typography>
          <Slider
            aria-label="Small steps"
            value={pickedColor.b}
            defaultValue={128}
            step={1}
            min={0}
            max={255}
            valueLabelDisplay="auto"
            onChange={(obj) =>
              setPickedColor({ ...pickedColor, b: obj.target.value })
            }
          />
          <ChromePicker
            color={pickedColor}
            disableAlpha={true}
            onChange={(obj) =>
              setPickedColor({ r: obj.rgb.r, g: obj.rgb.g, b: obj.rgb.b })
            }
          />
          <Button
            variant="contained"
            onClick={() => handlePick()}
            sx={{ marginTop: 2 }}
          >
            Find
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
