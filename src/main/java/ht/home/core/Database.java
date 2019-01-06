package ht.home.core;

import ht.home.HomeHtBackendConfiguration;
import ht.home.resources.MiscResource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.h2.tools.DeleteDbFiles;
import org.slf4j.LoggerFactory;


public class Database {
    private static final ch.qos.logback.classic.Logger LOGGER = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(MiscResource.class);
    private static String dbFolder = "";

    public Database(HomeHtBackendConfiguration params) {
        dbFolder = params.getDbFolder();
    }

    public void Create() throws SQLException {

        DeleteDbFiles.execute(dbFolder, "test", true);
        createBookingTable();
    }

    private static void createBookingTable() throws SQLException {
        Connection connection = getDBConnection();
        Statement stmt = null;
        try {
            connection.setAutoCommit(false);
            stmt = connection.createStatement();
            stmt.execute("CREATE TABLE booking(id int auto_increment primary key, " +
                                                    "name varchar(255)" +
                                                    "email varchar(100)" +
                                                    "phone varchar(25)" +
                                                    "salary int" +
                                                    "age int" +
                                                    "pets bit" + // 0 - has no pets, 1 - has pets
                                                    "tenantsNum int" +
                                                    "space int" + // square meters
                                                    "floor int" +
                                                    "roomsNum int" +
                                                    "rentPeriod int" + // in months, 0 - cannot tell
                                                ")");
            stmt.close();
            connection.commit();
        } catch (SQLException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.close();
        }
    }

    private static void addBooking(Booking b) throws SQLException {
        Connection connection = getDBConnection();
        Statement stmt = null;
        try {
            connection.setAutoCommit(false);
            stmt = connection.createStatement();
            stmt.execute("INSERT INTO booking(name, email, phone, salary, age, pets, tenantsNum, space, floor, roomsNum, rentPeriod) " +
                    "VALUES("+ b.name + ", " + b.email + ", " + b.phone + ", " + b.salary + ", " + b.age + ", " + b.pets + ", " +
                    b.tenantNum + ", " + b.space + ", " + b.floor + ", " + b.roomsNum + ", " + b.rentPeriod +
                    ")");
            stmt.close();
            connection.commit();
        } catch (SQLException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.close();
        }
    }

    private static List<Booking> selectBooking() throws SQLException {
        List<Booking> selectedBooking = new ArrayList<>();
        Connection connection = getDBConnection();
        Statement stmt = null;
        try {
            connection.setAutoCommit(false);
            stmt = connection.createStatement();

            ResultSet rs = stmt.executeQuery("SELECT * FROM booking");

            while (rs.next()) {
                Booking currentResult = null;
                currentResult.id = rs.getInt("id");
                currentResult.name = rs.getString("name");
                currentResult.email = rs.getString("email");
                currentResult.phone = rs.getString("phone");
                currentResult.salary = rs.getInt("salary");
                currentResult.age = rs.getInt("age");
                currentResult.pets = rs.getInt("pets");
                currentResult.tenantNum = rs.getInt("tenantNum");
                currentResult.space = rs.getInt("space");
                currentResult.floor = rs.getInt("floor");
                currentResult.roomsNum = rs.getInt("roomsNum");
                currentResult.rentPeriod = rs.getInt("rentPeriod");

                selectedBooking.add(currentResult);
            }
            stmt.close();
            connection.commit();
        } catch (SQLException e) {
            LOGGER.error(e.getLocalizedMessage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            connection.close();
        }

        return selectedBooking;
    }

    private static boolean doesDBExist(String connection, String user, String password) {
        boolean exists;
        try {
            Connection dbConnection = DriverManager.getConnection(connection + ";IFEXISTS=TRUE", user, password);
            dbConnection.close();
            exists = true;
        } catch(Exception e) {
            exists = false;
        }
        return exists;
    }

    private static Connection getDBConnection() {
        String DB_DRIVER = "org.h2.Driver";
        String DB_CONNECTION = "jdbc:h2:" + dbFolder + "test";
        String DB_USER = "";
        String DB_PASSWORD = "";

        Connection dbConnection = null;
        try {
            Class.forName(DB_DRIVER);
        } catch (ClassNotFoundException e) {
            LOGGER.error(e.getMessage());
        }
        try {
            dbConnection = DriverManager.getConnection(DB_CONNECTION, DB_USER, DB_PASSWORD);
            return dbConnection;
        } catch (SQLException e) {
            LOGGER.error(e.getMessage());
        }

        return dbConnection;
    }

}

