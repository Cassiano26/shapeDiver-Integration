import { 
  createSession,
  createViewport,
} from "@shapediver/viewer";
import { createParameterMenu } from "./parameter";

(async () => {

  const viewport = await createViewport({
    canvas: document.getElementById("canvas") as HTMLCanvasElement,
    id: "YouTubeViewport1"
  })

  const session = await createSession({
    ticket: "41a6a6e5465aa4cc714b224b17f03e7e577b20ab36e4f6db362ec43578187fbf55f7218b27bf2f25ceb0f3ee795a59f9cbbdd6e7425811a5ad1212ffa660e7da446e80aa23e77c7a5ac6a2dd9bfd17de184b367785bed4d045b1286afed8fb23b7bb4917e93bd1-25ba812aab3a2077e83d25e371a7e466",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
    id: "cass"
  })

  createParameterMenu(session);

  const outPutDiv = document.getElementById("outPut") as HTMLDivElement;
  const TotalPriceDiv = document.createElement("h1");
  outPutDiv.appendChild(TotalPriceDiv);
  TotalPriceDiv.id = "totalPrice"
  TotalPriceDiv.textContent = session.getOutputByName("TotalPrice")[0].content[0].data;


  
})();