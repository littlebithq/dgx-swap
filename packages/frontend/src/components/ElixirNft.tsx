import { Button } from "@mui/material";

const ElixirNft = (props: {
  imageUri: string,
  permalink: string
}) => {
  return (
    <div className="ElixirNftContainer">
      <img className="ElixirNftImage" src={props.imageUri} alt="" onClick={() => {
        window.open(props.permalink, '_blank')
      }} />
      <div className="ElixirNftActions">
        <Button color="secondary" variant="contained">Merge</Button>
      </div>
    </div>
  );
}

export default ElixirNft;
