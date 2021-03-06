export function DocTableProvider({ getService }) {
  const testSubjects = getService('testSubjects');
  const retry = getService('retry');

  class DocTable {
    async getTable() {
      return await testSubjects.find('docTable');
    }

    async getBodyRows(table) {
      return await table.findAllByCssSelector('[data-test-subj~="docTableRow"]');
    }

    async getAnchorRow(table) {
      return await table.findByCssSelector('[data-test-subj~="docTableAnchorRow"]');
    }

    async getAnchorDetailsRow(table) {
      return await table.findByCssSelector('[data-test-subj~="docTableAnchorRow"] + [data-test-subj~="docTableDetailsRow"]');
    }

    async getRowExpandToggle(row) {
      return await row.findByCssSelector('[data-test-subj~="docTableExpandToggleColumn"]');
    }

    async getDetailsRows(table) {
      return await table.findAllByCssSelector('[data-test-subj~="docTableRow"] + [data-test-subj~="docTableDetailsRow"]');
    }

    async getRowActions(row) {
      return await row.findAllByCssSelector('[data-test-subj~="docTableRowAction"]');
    }

    async getFields(row) {
      return await row.findAllByCssSelector('[data-test-subj~="docTableField"]');
    }

    async getHeaderFields(table) {
      return await table.findAllByCssSelector('[data-test-subj~="docTableHeaderField"]');
    }

    async getTableDocViewRow(detailsRow, fieldName) {
      return await detailsRow.findByCssSelector(`[data-test-subj~="tableDocViewRow-${fieldName}"]`);
    }

    async getAddInclusiveFilterButton(tableDocViewRow) {
      return await tableDocViewRow.findByCssSelector(`[data-test-subj~="addInclusiveFilterButton"]`);
    }

    async addInclusiveFilter(detailsRow, fieldName) {
      const tableDocViewRow = await this.getTableDocViewRow(detailsRow, fieldName);
      const addInclusiveFilterButton = await this.getAddInclusiveFilterButton(tableDocViewRow);
      await addInclusiveFilterButton.click();
    }

    async toggleRowExpanded(row) {
      const rowExpandToggle = await this.getRowExpandToggle(row);
      await rowExpandToggle.click();

      const detailsRow = await row.findByXpath('./following-sibling::*[@data-test-subj="docTableDetailsRow"]');
      return await retry.try(async () => {
        return detailsRow.findByCssSelector('[data-test-subj~="docViewer"]');
      });
    }
  }

  return new DocTable();
}
