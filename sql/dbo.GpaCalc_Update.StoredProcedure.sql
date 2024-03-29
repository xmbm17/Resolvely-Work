USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[GpaCalc_Update]    Script Date: 12/15/2023 6:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Mark Martinez
-- Create date: 11/22/2023
-- Description: An update proc thats used to update the students gpa calc
-- Code Reviewer: Luther Adamson 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE PROC [dbo].[GpaCalc_Update]
	@Id int,
	@LevelTypeId int,
	@CourseId int,
	@GradeTypeId int,
	@CourseWeightTypeId int,
	@Credits decimal(2,1), 
	@Semester int,
	@CreatedById int


as 


/*test code 

Declare @Id int =2,
	@LevelTypeId int= 2,
	@CourseId int = 2,
	@GradeTypeId int =2,
	@CourseWeightTypeId int = 2,
	@Credits decimal(2,1) = 3.9, 
	@Semester int =2,
	@CreatedById int =1


EXECUTE dbo.GpaCalc_Update @Id ,
	@LevelTypeId ,
	@CourseId ,
	@GradeTypeId ,
	@CourseWeightTypeId ,
	@Credits , 
	@Semester ,
	@CreatedById 




*/
BEGIN

UPDATE [dbo].[GpaCalc]
   SET [LevelTypeId] = @LevelTypeId
      ,[CourseId] = @CourseId
      ,[GradeTypeId] =@GradeTypeId
      ,[CourseWeightTypeId] = @CourseWeightTypeId
      ,[Credits] = @Credits
      ,[Semester] = @Semester
	  ,CreatedById = @CreatedById

	  Where Id = @Id

END


GO
