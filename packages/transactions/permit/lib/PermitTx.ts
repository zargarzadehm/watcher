import { AbstractLogger } from '@rosen-bridge/abstract-logger';
import { RWTRepo } from '@rosen-bridge/rwt-repo';
import { GetPermitBuilder } from './GetPermitBuilder';
import { ReturnPermitBuilder } from './ReturnPermitBuilder';

export class PermitTx {
  private static instance?: PermitTx;

  private constructor(
    private permitAddress: string,
    private collateralAddress: string,
    private changeAddress: string,
    private rsn: string,
    private rwt: string,
    private txFee: string,
    private rwtRepo: RWTRepo,
    private logger?: AbstractLogger
  ) {}

  /**
   * initializes the singleton instance of PermitTx
   *
   * @static
   * @param {string} permitAddress
   * @param {string} collateralAddress
   * @param {string} changeAddress
   * @param {string} rsn
   * @param {string} rwt
   * @param {string} txFee
   * @param {RWTRepo} rwtRepo
   * @param {AbstractLogger} [logger]
   */
  static init = (
    permitAddress: string,
    collateralAddress: string,
    changeAddress: string,
    rsn: string,
    rwt: string,
    txFee: string,
    rwtRepo: RWTRepo,
    logger?: AbstractLogger
  ): void => {
    if (PermitTx.instance != undefined) {
      throw new Error('The singleton instance is already initialized.');
    }

    PermitTx.instance = new PermitTx(
      permitAddress,
      collateralAddress,
      changeAddress,
      rsn,
      rwt,
      txFee,
      rwtRepo,
      logger
    );
  };

  /**
   * return the singleton instance of PermitTx
   *
   * @static
   * @return {PermitTx}
   */
  static getInstance = (): PermitTx => {
    if (!this.instance) {
      throw new Error('PermitTx instance is not initialized yet');
    }
    return this.instance;
  };

  /**
   * creates a new instance of GetPermitBuilder
   *
   * @return {GetPermitBuilder}
   */
  newGetPermitBuilder = (): GetPermitBuilder => {
    return new GetPermitBuilder(
      this.permitAddress,
      this.collateralAddress,
      this.changeAddress,
      this.rsn,
      this.rwt,
      this.txFee,
      this.rwtRepo,
      this.logger
    );
  };

  /**
   * creates a new instance of ReturnPermitBuilder
   *
   * @return {ReturnPermitBuilder}
   */
  newًReturnPermitBuilder = (): ReturnPermitBuilder => {
    return new ReturnPermitBuilder(
      this.permitAddress,
      this.collateralAddress,
      this.changeAddress,
      this.rsn,
      this.rwt,
      this.txFee,
      this.rwtRepo,
      this.logger
    );
  };
}
