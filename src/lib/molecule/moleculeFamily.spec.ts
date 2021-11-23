import { snapshot_UNSTABLE } from "recoil";
import { moleculeFamily } from "./moleculeFamily";

describe("moleculeFamily", () => {
  it("adds molecules", () => {
    const fam = moleculeFamily<{ say: string }>("myFamily");
    fam.addMolecule("Jon", { say: "hello" });
    fam.addMolecule("Peter", { say: "nihao" });

    expect(fam.getModuleKeys()).toEqual(["Jon", "Peter"]);
  });

  it("resets molecule family - reset all molecules and empty all records", () => {
    const fam = moleculeFamily<{ says: string }>("myFamily2");
    fam.addMolecule("Jonnie", { says: "hello" });

    // before reset
    const initSnap = snapshot_UNSTABLE();
    expect(
      initSnap
        .getLoadable(fam.getMolecule("Jonnie").getAtom("says"))
        .valueOrThrow()
    ).toEqual("hello");

    // reset
    const resetSnap = snapshot_UNSTABLE(({ reset }) =>
      reset(fam.entitiesResetSelector)
    );

    // molecule is empty
    expect(
      resetSnap
        .getLoadable(fam.getMolecule("Jonnie").getAtom("says"))
        .valueOrThrow()
    ).toBeUndefined();

    // record is reset
    expect(fam.getModuleKeys()).toEqual([]);
  });
});
