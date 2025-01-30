using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bitachon_server.Migrations
{
    /// <inheritdoc />
    public partial class ProductsMigratio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

         
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
            { 1, "חלב וגבינות"},
            { 2, "טואלטיקה"},
            { 3, "בשר ועופות"},
            { 4, "ירקות ופירות"},
           
                });
            migrationBuilder.InsertData(
                  table: "Products",
                  columns: new[] { "Id", "Name" , "Price", "CategoryId" },
                  values: new object[,]
                  {
            { 1, "חלב",6,1},
            { 2, "גבינה",7,1},
            { 3, "קוטג",7,1},
            { 4, "שמנת",5,1},
          { 5, "נייר טואלט",30,2},
          { 6, "משחת שיניים",10,2},
          { 7, "קסמי שיניים",5,2},
          { 8, "כרעיים",30,3},
          { 9, "שוקיים",35,3},
          { 10, "בשר שריר",70,3},
          { 11, "כבד",50,3},
          { 12, "בצל",10,4},
          { 13, "עגבניה",12,4},
          { 14, "מלפפון",14,4},
          { 15, "אבוקדו",20,4},
          { 16, "תפוז",7,4},

                  });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
