import JsonBigInt from '@rosen-bridge/json-bigint';
import * as ergoLib from 'ergo-lib-wasm-nodejs';
import { beforeEach, describe, expect, it } from 'vitest';
import { TriggerTxBuilder } from '../lib';
import {
  createCommitmentErgoBox,
  sampleCommitmentBoxes,
  sampleWid,
} from './triggerTxBuilderTestData';
import {
  changeAddress,
  observationEntity1,
  sampleRwtRepoboxInfo,
  triggerTxParams,
} from './triggerTxTestData';
import { hexToUint8Array } from '../lib/utils';

describe('TriggerTxBuilder', () => {
  let triggerTxBuilder: TriggerTxBuilder;

  beforeEach(() => {
    triggerTxBuilder = new TriggerTxBuilder(
      triggerTxParams.triggerAddress,
      triggerTxParams.commitmentAddress,
      triggerTxParams.permitAddress,
      changeAddress,
      triggerTxParams.rwt,
      triggerTxParams.txFee,
      triggerTxParams.rwtRepo,
      observationEntity1
    );
  });

  describe('setCreationHeight', () => {
    /**
     * @target should set creation height for the current instance
     * @dependencies
     * @scenario
     * - call setCreationHeight
     * - check TriggerTxBuilder to have the right height set
     * @expected
     * - TriggerTxBuilder should have the right height set
     */
    it(`should set creation height for the current instance`, async () => {
      const newHeight = 5555;
      triggerTxBuilder.setCreationHeight(newHeight);
      expect(triggerTxBuilder['creationHeight']).toEqual(newHeight);
    });
  });

  describe('setBoxIterator', () => {
    /**
     * @target should set boxIterator for the current instance
     * @dependencies
     * @scenario
     * - call setBoxIterator
     * - check TriggerTxBuilder to have the right boxIterator value set
     * @expected
     * - TriggerTxBuilder should have the right boxIterator value set
     */
    it(`should set boxIterator for the current instance`, async () => {
      const boxIterator = {
        next: (): IteratorResult<ergoLib.ErgoBox, undefined> => {
          return {
            value: ergoLib.ErgoBox.from_json(
              JsonBigInt.stringify(sampleRwtRepoboxInfo)
            ),
            done: false,
          };
        },
      };

      triggerTxBuilder.setBoxIterator(boxIterator);

      expect(triggerTxBuilder['boxIterator']).toBe(boxIterator);
    });
  });

  describe('addCommitment', () => {
    /**
     * @target should only contain the passed commitment after calling it for
     * the first time
     * @dependencies
     * @scenario
     * - call addCommitment
     * - check TriggerTxBuilder.commitments to contain only the passed
     *   commitment
     * @expected
     * - TriggerTxBuilder.commitments should contain only the passed commitment
     */
    it(`should only contain the passed commitment after calling it for the first
    time`, async () => {
      const commitment = ergoLib.ErgoBox.from_json(
        JsonBigInt.stringify(sampleCommitmentBoxes[0])
      );
      triggerTxBuilder.addCommitments([commitment]);

      expect(
        triggerTxBuilder['commitments']
          .map((box) => box.box_id().to_str())
          .sort()
      ).toEqual([commitment.box_id().to_str()]);
    });

    /**
     * @target should contain both the passed commitment and already existing
     * commitments when called more than once
     * @dependencies
     * @scenario
     * - call addCommitment more than once
     * - check TriggerTxBuilder.commitments to contain all the commitments
     * @expected
     * - TriggerTxBuilder.commitments should contain all the commitments
     */
    it(`should contain both the passed commitment and already existing
    commitments when called more than once`, async () => {
      const commitments = sampleCommitmentBoxes.map((boxInfo) =>
        ergoLib.ErgoBox.from_json(JsonBigInt.stringify(boxInfo))
      );

      triggerTxBuilder.addCommitments(commitments.slice(0, 2));
      triggerTxBuilder.addCommitments(commitments.slice(2));

      expect(
        triggerTxBuilder['commitments']
          .map((box) => box.box_id().to_str())
          .sort()
      ).toEqual(commitments.map((box) => box.box_id().to_str()).sort());
    });

    /**
     * @target should throw exception when passed commitments contain repetitive
     * boxes
     * @dependencies
     * @scenario
     * - call addCommitment
     * - call addCommitment again with repetitive boxes
     * - check TriggerTxBuilder.commitments to throw exception
     * @expected
     * - TriggerTxBuilder.commitments should throw exception
     */
    it(`should throw exception when passed commitments contain repetitive boxes`, async () => {
      const commitments = sampleCommitmentBoxes.map((boxInfo) =>
        ergoLib.ErgoBox.from_json(JsonBigInt.stringify(boxInfo))
      );

      triggerTxBuilder.addCommitments(commitments.slice(0, 5));
      expect(() =>
        triggerTxBuilder.addCommitments(commitments.slice(2, 3))
      ).toThrow('already included in commitments');
    });

    /**
     * @target should throw exception when passed commitment doesn't have the
     * right commitment address
     * @dependencies
     * @scenario
     * - call addCommitment with a commitment having the wrong commitment
     *   address
     * - check TriggerTxBuilder.commitments to throw exception
     * @expected
     * - TriggerTxBuilder.commitments should throw exception
     */
    it(`should throw exception when passed commitment doesn't have the right
    commitment address`, async () => {
      const commitment = createCommitmentErgoBox(
        'nB3L2PD3JzpCPns7SoypaDJTg4KbG6UQBPknQuM3WZ4ZhPj3TGV5R5YArit7trzUum77qJ76JLLiJfW3Au8o3AvMh1suY2rcRm1UPfroUiTZfQrNL8izs6CBJYwMLf5jDSt3YwcFEPVYG',
        triggerTxBuilder['rwt'],
        triggerTxBuilder['rwtRepo'].getCommitmentRwtCount(),
        triggerTxBuilder['permitScriptHash'],
        sampleWid,
        triggerTxBuilder['observation'].requestId,
        triggerTxBuilder['calcEventDigest'](sampleWid)
      );

      expect(() => triggerTxBuilder.addCommitments([commitment])).toThrow(
        `doesn't have the right commitment address`
      );
    });

    /**
     * @target should throw exception when passed commitment doesn't have the
     * rwt token
     * @dependencies
     * @scenario
     * - call addCommitment with a commitment not having the rwt token
     * - check TriggerTxBuilder.commitments to throw exception
     * @expected
     * - TriggerTxBuilder.commitments should throw exception
     */
    it(`should throw exception when passed commitment doesn't have the rwt token`, async () => {
      const commitment = createCommitmentErgoBox(
        triggerTxBuilder['commitmentAddress'],
        'e4dca5c7b35ead14e65699505bdd65af5c00b2249327e0ed9ba0e2b509101a82',
        triggerTxBuilder['rwtRepo'].getCommitmentRwtCount(),
        triggerTxBuilder['permitScriptHash'],
        sampleWid,
        triggerTxBuilder['observation'].requestId,
        triggerTxBuilder['calcEventDigest'](sampleWid)
      );

      expect(() => triggerTxBuilder.addCommitments([commitment])).toThrow(
        `should have rwt as the first token`
      );
    });

    /**
     * @target should throw exception when passed commitment doesn't have the
     * required amount of rwt
     * @dependencies
     * @scenario
     * - call addCommitment with a commitment not having enough rwt tokens
     * - check TriggerTxBuilder.commitments to throw exception
     * @expected
     * - TriggerTxBuilder.commitments should throw exception
     */
    it(`should throw exception when passed commitment doesn't have the required
    amount of rwt`, async () => {
      const commitment = createCommitmentErgoBox(
        triggerTxBuilder['commitmentAddress'],
        triggerTxBuilder['rwt'],
        1n,
        triggerTxBuilder['permitScriptHash'],
        sampleWid,
        triggerTxBuilder['observation'].requestId,
        triggerTxBuilder['calcEventDigest'](sampleWid)
      );

      expect(() => triggerTxBuilder.addCommitments([commitment])).toThrow(
        `should have [${triggerTxBuilder[
          'rwtRepo'
        ].getCommitmentRwtCount()}] rwt tokens buts has`
      );
    });

    /**
     * @target should throw exception when passed commitment doesn't have a wid
     * @dependencies
     * @scenario
     * - call addCommitment with a commitment that doesn't have a wid
     * - check TriggerTxBuilder.commitments to throw exception
     * @expected
     * - TriggerTxBuilder.commitments should throw exception
     */
    it(`should throw exception when passed commitment doesn't have a wid`, async () => {
      const commitment = createCommitmentErgoBox(
        triggerTxBuilder['commitmentAddress'],
        triggerTxBuilder['rwt'],
        triggerTxBuilder['rwtRepo'].getCommitmentRwtCount(),
        triggerTxBuilder['permitScriptHash'],
        undefined,
        triggerTxBuilder['observation'].requestId,
        triggerTxBuilder['calcEventDigest'](sampleWid)
      );

      expect(() => triggerTxBuilder.addCommitments([commitment])).toThrow(
        `commitment should have a wid defined in its R4 register`
      );
    });

    /**
     * @target should throw exception when passed commitment doesn't have an
     * event digest
     * @dependencies
     * @scenario
     * - call addCommitment with a commitment that doesn't have an event digest
     * - check TriggerTxBuilder.commitments to throw exception
     * @expected
     * - TriggerTxBuilder.commitments should throw exception
     */
    it(`should throw exception when passed commitment doesn't have an event
    digest`, async () => {
      const commitment = createCommitmentErgoBox(
        triggerTxBuilder['commitmentAddress'],
        triggerTxBuilder['rwt'],
        triggerTxBuilder['rwtRepo'].getCommitmentRwtCount(),
        triggerTxBuilder['permitScriptHash'],
        sampleWid,
        triggerTxBuilder['observation'].requestId,
        undefined
      );

      expect(() => triggerTxBuilder.addCommitments([commitment])).toThrow(
        `commitment should have an event digest defined in its R6 register`
      );
    });

    /**
     * @target should throw exception when passed commitment with an incorrect
     * event digest
     * @dependencies
     * @scenario
     * - call addCommitment with a commitment that has an incorrect event digest
     * - check TriggerTxBuilder.commitments to throw exception
     * @expected
     * - TriggerTxBuilder.commitments should throw exception
     */
    it(`should throw exception when passed commitment with an incorrect event
    digest`, async () => {
      const commitment = createCommitmentErgoBox(
        triggerTxBuilder['commitmentAddress'],
        triggerTxBuilder['rwt'],
        triggerTxBuilder['rwtRepo'].getCommitmentRwtCount(),
        triggerTxBuilder['permitScriptHash'],
        sampleWid,
        triggerTxBuilder['observation'].requestId,
        hexToUint8Array('abcd')
      );

      expect(() => triggerTxBuilder.addCommitments([commitment])).toThrow(
        `commitment doesn't have the correct event digest`
      );
    });
  });
});
