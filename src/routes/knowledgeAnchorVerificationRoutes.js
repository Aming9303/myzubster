const express = require('express');
const { JsonRpcProvider, toUtf8String } = require('ethers');

const router = express.Router();

const EXPECTED_CHAIN_ID = 84532n;
const RPC_URL = process.env.MARKETPLACE_BASE_RPC_URL || process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org';
const HASH = '39ab3a177734b5e3e254657cfe6015100644bcda2fb008cf2561d000669b9e14';
const PAYLOAD = `MZ-KNOWLEDGE-V1:${HASH}`;
const EVIDENCE_SINK = '0x000000000000000000000000000000000000dead';

router.get('/n4k48/:txId', async (req, res) => {
  const txId = String(req.params.txId || '').trim();
  if (!/^0x[0-9a-f]{64}$/i.test(txId)) {
    return res.status(400).json({ success: false, error: 'Invalid transaction hash' });
  }

  try {
    const provider = new JsonRpcProvider(RPC_URL, Number(EXPECTED_CHAIN_ID), { staticNetwork: true });
    const network = await provider.getNetwork();
    if (network.chainId !== EXPECTED_CHAIN_ID) {
      throw new Error(`Unexpected chain id: ${network.chainId}`);
    }

    const [tx, receipt] = await Promise.all([
      provider.getTransaction(txId),
      provider.getTransactionReceipt(txId)
    ]);

    if (!tx || !receipt) {
      return res.status(404).json({ success: false, error: 'Transaction or receipt not found' });
    }

    let decodedData = null;
    try { decodedData = toUtf8String(tx.data); } catch (_) {}

    const block = await provider.getBlock(receipt.blockNumber);
    const checks = {
      chainId: network.chainId === EXPECTED_CHAIN_ID,
      receiptSuccess: receipt.status === 1,
      zeroValue: tx.value === 0n,
      evidenceSink: String(tx.to || '').toLowerCase() === EVIDENCE_SINK,
      exactCalldata: decodedData === PAYLOAD
    };
    const match = Object.values(checks).every(Boolean);

    return res.status(match ? 200 : 409).json({
      success: match,
      status: match ? 'MATCH' : 'MISMATCH',
      schema: 'myzubster.knowledge-transfer.v1',
      transferId: 'KNOWLEDGE-N4K48-2026-09-18-001',
      commitment: {
        algorithm: 'SHA-256',
        hash: HASH,
        payload: PAYLOAD
      },
      transaction: {
        txId: tx.hash,
        network: 'base-sepolia',
        chainId: Number(network.chainId),
        blockNumber: receipt.blockNumber,
        confirmedAt: block?.timestamp ? new Date(Number(block.timestamp) * 1000).toISOString() : null,
        from: tx.from,
        to: tx.to,
        valueWei: tx.value.toString(),
        dataUtf8: decodedData
      },
      checks
    });
  } catch (error) {
    console.error('Knowledge anchor verification failed', error);
    return res.status(502).json({ success: false, error: error.message || 'Verification failed' });
  }
});

module.exports = router;
