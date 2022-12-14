import type {
  AccountResponse,
  AddChainParams,
  RequestAccountResponse,
  SignAminoDoc,
  SignAminoResponse,
  SignDirectDoc,
  SignDirectResponse,
  SignOptions,
  SupportedChainNamesResponse,
} from './types/message';

export function getSupportedChains() {
  return window.metaid.tendermint.request({ method: 'ten_supportedChainNames' }) as Promise<SupportedChainNamesResponse>;
}

export function getAccount(chainName: string) {
  return window.metaid.tendermint.request({ method: 'ten_account', params: { chainName } }) as Promise<AccountResponse>;
}

export function requestAccount(chainName: string) {
  return window.metaid.tendermint.request({ method: 'ten_requestAccount', params: { chainName } }) as Promise<RequestAccountResponse>;
}

export function addChain(chain: AddChainParams) {
  return window.metaid.tendermint.request({ method: 'ten_addChain', params: { ...chain } }) as Promise<boolean>;
}

export function signAmino(chainName: string, doc: SignAminoDoc, options?: SignOptions) {
  return window.metaid.tendermint.request({
    method: 'ten_signAmino',
    params: { chainName, doc, isEditMemo: !!options?.memo, isEditFee: !!options?.fee, gasRate: options?.gasRate },
  }) as Promise<SignAminoResponse>;
}

export function signDirect(chainName: string, doc: SignDirectDoc, options?: SignOptions) {
  return window.metaid.tendermint.request({
    method: 'ten_signDirect',
    params: { chainName, doc, isEditMemo: !!options?.memo, isEditFee: !!options?.fee, gasRate: options?.gasRate },
  }) as Promise<SignDirectResponse>;
}

export function onAccountChanged(handler: () => void) {
  return window.metaid.tendermint.on('accountChanged', handler);
}

export function offAccountChanged(event: unknown) {
  window.metaid.tendermint.off(event);
}
