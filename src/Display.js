import React, {useState} from 'react';
import { Stack, Button, Box, Slider } from '@mui/material';
import { ChromePicker} from 'react-color';
import { find_closest_color } from 'color-picker-library';

export const Display = () => {
  const [pickedColor, setPickedColor] = useState({r:128, g: 128, b:128})
  const [resultColor, setResultColor] = useState({r:128, g: 128, b:128})
  const [resultName, setResultName] = useState("Gray")

  function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  //const hexToRgb = (hex) => {
  //  const r = parseInt(hex.slice(1, 3), 16)
  //  const g = parseInt(hex.slice(3, 5), 16)
  //  const b = parseInt(hex.slice(5, 7), 16)
  //  return {r, g, b}
  //}

  function handlePick() {
    const colorObj = find_closest_color(pickedColor.r, pickedColor.g, pickedColor.b)
    setResultColor({r:colorObj.rgb[0],g:colorObj.rgb[1],b:colorObj.rgb[2]})
    setResultName(colorObj.name)
  }

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <h1>Closest Color</h1>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
            bgcolor: rgbToHex(resultColor.r, resultColor.g, resultColor.b),
          }}
        />
        <body>{resultName}</body>
      </div>
      <Box component="section" sx={{ width: 250, height: 490, border: '1px dashed grey' }}>
      <body>Red</body>
      <Slider
        aria-label="Small steps"
        value={pickedColor.r}
        defaultValue={128}
        step={1}
        min={0}
        max={255}
        valueLabelDisplay="auto"
        onChange={(obj)=>(setPickedColor({...pickedColor, r:obj.target.value}))}
      />
      <body>Green</body>
      <Slider
        aria-label="Small steps"
        value={pickedColor.g}
        defaultValue={128}
        step={1}
        min={0}
        max={255}
        valueLabelDisplay="auto"
        onChange={(obj)=>(setPickedColor({...pickedColor, g:obj.target.value}))}
      />
      <body>Blue</body>
      <Slider
        aria-label="Small steps"
        value={pickedColor.b}
        defaultValue={128}
        step={1}
        min={0}
        max={255}
        valueLabelDisplay="auto"
        onChange={(obj)=>(setPickedColor({...pickedColor, b:obj.target.value}))}
      />
      <ChromePicker
        color = {pickedColor}
        disableAlpha = {true}
        onChange={(obj)=>(setPickedColor({r: obj.rgb.r, g: obj.rgb.g, b: obj.rgb.b}))}
      />
      <Button variant="contained" onClick={()=>(handlePick())}>Find</Button>
      </Box>
    </Stack>
  )
}