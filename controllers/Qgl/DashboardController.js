const Membership = require("../../model/Qgl/MembershipDb");
const Receipt = require("../../model/Qgl/QglDB.js");

const DashboardController = {
  async stats(req, res, next) {
    try {
      // Total members
      const totalMembers = await Membership.countDocuments();
      // Total receipts (EntryMode)
      const totalReceipts = await Receipt.countDocuments();
      // Today's receipts
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const todayReceipts = await Receipt.countDocuments({
        date: { $gte: today, $lt: tomorrow },
      });
      // Last 7 days receipts
      const last7 = new Date();
      last7.setDate(today.getDate() - 6);
      last7.setHours(0, 0, 0, 0);
      const last7Receipts = await Receipt.countDocuments({
        date: { $gte: last7, $lt: tomorrow },
      });
      // Most recent 5 receipts
      const recentReceipts = await Receipt.find().sort({ date: -1 }).limit(5);
      res.json({
        totalMembers,
        totalReceipts,
        todayReceipts,
        last7Receipts,
        recentReceipts,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = DashboardController;
