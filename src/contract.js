export async function handle(state, action) {
    let {input, caller}=action

    if(!input||typeof input!=="object"||!input.function||typeof input.function!=="string"){
        throw new ContractError("No function")
    }

    return await (({
        "propose":require("./functions/propose.js"),
        "sign":require("./functions/sign.js")
    })[input.function]||(()=>{throw new ContractError("Invalid function")}))(state,action)


}