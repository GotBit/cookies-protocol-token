/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AntisnipeMock, AntisnipeMockInterface } from "../AntisnipeMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "assureCanTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastFrom",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastSender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastTo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061054e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063256fec881461005c5780635d37a8dd1461007a5780638044337814610096578063829a86d9146100b4578063c1468447146100d2575b600080fd5b6100646100f0565b6040516100719190610405565b60405180910390f35b610094600480360381019061008f9190610487565b610114565b005b61009e61036f565b6040516100ab9190610405565b60405180910390f35b6100bc610395565b6040516100c991906104fd565b60405180910390f35b6100da61039b565b6040516100e79190610405565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6101407f739d24bd6cfbbf4ef613dd9774f1e62db0e6aa4e559a928ec62f99bd2be9fe8c60001b6103c1565b61016c7f6a50cc649ceba5ad5cd70fc32509788110572491d280644c67c1555de258e04060001b6103c1565b6101987f5d85fc71ab852fa64f13b943b596d601114de5b00c46bbbb4b7aef6bf4a18f5a60001b6103c1565b836000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102047f2301373457973a27d5797d09d0350d187da31e8ba9e17b405ae3c7de26f5c0a960001b6103c1565b6102307fe42be1c23817c46dd9e8d2d39dabf82c8a850330ab45d6cde5a2ccef7650757360001b6103c1565b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061029d7fed8e74f95dbfff68a2434f5a08f233dd3585f807bcefde528b4fe8005d1ea7c360001b6103c1565b6102c97fe1993f75fbc1d656f3cb5a4377d7f57a8819036c0fd18a8063e4f7bcc7353a4e60001b6103c1565b81600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506103367fd7436a7f38cd2b1ff5ba933649d57a317cc4d267d604074cd63b0ee76667482660001b6103c1565b6103627fc84783a79977bc9b5325bf3945fc964694089c961147944eb29e7dff3d0767b360001b6103c1565b8060038190555050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b50565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103ef826103c4565b9050919050565b6103ff816103e4565b82525050565b600060208201905061041a60008301846103f6565b92915050565b600080fd5b61042e816103e4565b811461043957600080fd5b50565b60008135905061044b81610425565b92915050565b6000819050919050565b61046481610451565b811461046f57600080fd5b50565b6000813590506104818161045b565b92915050565b600080600080608085870312156104a1576104a0610420565b5b60006104af8782880161043c565b94505060206104c08782880161043c565b93505060406104d18782880161043c565b92505060606104e287828801610472565b91505092959194509250565b6104f781610451565b82525050565b600060208201905061051260008301846104ee565b9291505056fea2646970667358221220e15ff515fe6b2429fb387280c7a22140d62064aff0bea088d1f6610b3ff637f864736f6c634300080f0033";

export class AntisnipeMock__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AntisnipeMock> {
    return super.deploy(overrides || {}) as Promise<AntisnipeMock>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AntisnipeMock {
    return super.attach(address) as AntisnipeMock;
  }
  connect(signer: Signer): AntisnipeMock__factory {
    return super.connect(signer) as AntisnipeMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AntisnipeMockInterface {
    return new utils.Interface(_abi) as AntisnipeMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AntisnipeMock {
    return new Contract(address, _abi, signerOrProvider) as AntisnipeMock;
  }
}
