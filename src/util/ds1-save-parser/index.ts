export const parseSaveFile = (buffer: ArrayBuffer) => {
    isBND4File(buffer);
    return true;
}

export enum DSFileTypes{
    PREPARE_TO_DIE,
    REMASTERED,
    UNKNOWN
}

const BND4 = 'BND4';
const isBND4File = (buffer:ArrayBuffer) => {
    const decoder = new TextDecoder();
    const firstFourBytes = new Uint8Array(buffer.slice(0, 4));
    const decodedFirstFourBytes = decoder.decode(firstFourBytes);
    if(decodedFirstFourBytes !== BND4){
        throw new Error("File isn't a Dark Souls Prepare to Die or Remastered File");        
    }
    return true;    
};