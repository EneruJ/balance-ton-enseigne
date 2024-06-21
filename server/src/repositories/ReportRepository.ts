import Report from "../models/Report";
import database from "../config/database";
import {ResultSetHeader} from "mysql2";

class ReportRepository {
    static async create(report: Report): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("INSERT INTO Report (enseigne, description, location, photoUrl, city, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)", [report.enseigne, report.description, report.location, report.photoUrl, report.city, report.user_id, report.status]);
        return results;
    }

    static async selectAll(): Promise<Report[]> {
        const [results] = await database.execute<Report[]>("SELECT * FROM Report");
        return results;
    }

    static async selectOneByReportId(reportId: number): Promise<Report[]> {
        const [results] = await database.execute<Report[]>("SELECT * FROM Report WHERE report_id = ?", [reportId]);
        return results;
    }

    static async selectOneByEnseigne(enseigne: string): Promise<Report[]> {
        const enseigneLower = enseigne.toLowerCase();
        const [results] = await database.execute<Report[]>("SELECT * FROM Report WHERE LOWER(enseigne) = ?", [enseigneLower]);
        return results;
    }

    static async update(reportId: number, report: Report): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("UPDATE Report SET enseigne = ?, description = ?, location = ?, photoUrl = ?, city = ?, user_id = ?, status = ? WHERE report_id = ?", [report.enseigne, report.description, report.location, report.photoUrl, report.city, report.user_id, report.status, reportId]);
        return results;
    }

    static async updateStatus(reportId: number, status: string): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("UPDATE Report SET status = ? WHERE report_id = ?", [status, reportId]);
        return results;
    }

    static async delete(reportId: number): Promise<ResultSetHeader> {
        const [results] = await database.execute<ResultSetHeader>("DELETE FROM Report WHERE report_id = ?", [reportId]);
        return results;
    }
}

export default ReportRepository;