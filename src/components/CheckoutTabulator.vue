

<template>
  <div>
    <h2>HTML Table</h2>

    <table>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Checked Out</th>
        <th>Checked In</th>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>Germany</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Mexico</td>
        <td>Mexico</td>
      </tr>
      <tr>
        <td>Ernst Handel</td>
        <td>Roland Mendel</td>
        <td>Austria</td>
        <td>Austria</td>
      </tr>
      <tr>
        <td>Island Trading</td>
        <td>Helen Bennett</td>
        <td>UK</td>
        <td>UK</td>
      </tr>
      <tr>
        <td>Laughing Bacchus Winecellars</td>
        <td>Yoshi Tannamuri</td>
        <td>Canada</td>
        <td>Canada</td>
      </tr>
      <tr>
        <td>Magazzini Alimentari Riuniti</td>
        <td>Giovanni Rovelli</td>
        <td>Italy</td>
        <td>Italy</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CheckoutTabulator',

  computed: {
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1);
      const endIndex = startIndex + this.perPage;
      return [
        {
          code: "UZ",
          name: "Uzbekistan",
          created_at: "2015-04-24T01:46:50.438748",
          updated_at: "2015-04-24T01:46:50.438757",
          uri: "http://api.lobbyfacts.eu/api/1/country/237",
          id: 237
        }, {
          code: "UY",
          name: "Uruguay",
          created_at: "2015-04-24T01:46:50.435761",
          updated_at: "2015-04-24T01:46:50.435770",
          uri: "http://api.lobbyfacts.eu/api/1/country/236",
          id: 236
        }
      ]
    }
  },
  created() {
    // here we simulate an api call that returns the complete list
    // for (let i = 1; i <= 500; i++) {
    //     this.records.push(`Item ${i}`);
    // }
  }
}

</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>