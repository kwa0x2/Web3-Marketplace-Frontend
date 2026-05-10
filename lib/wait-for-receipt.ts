import type { PublicClient } from 'viem';

const RECEIPT_TIMEOUT = 600_000; // 10 minutes

export async function waitForReceipt(
  publicClient: PublicClient,
  hash: `0x${string}`,
  label = 'Transaction'
) {
  let receipt;
  try {
    receipt = await publicClient.waitForTransactionReceipt({
      hash,
      pollingInterval: 2_000,
      timeout: RECEIPT_TIMEOUT,
    });
  } catch (err: any) {
    if (err?.name === 'WaitForTransactionReceiptTimeoutError') {
      throw new Error(
        `${label} is taking longer than expected. Check your wallet for status. Hash: ${hash.slice(0, 10)}...`
      );
    }
    throw err;
  }

  if (receipt.status === 'reverted') {
    throw new Error(`${label} failed on-chain (reverted). Gas may be too low — try again with higher gas.`);
  }

  return receipt;
}
