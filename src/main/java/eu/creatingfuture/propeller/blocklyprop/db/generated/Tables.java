/**
 * This class is generated by jOOQ
 */
package eu.creatingfuture.propeller.blocklyprop.db.generated;


import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.Project;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.ProjectTag;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.Tag;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.User;

import javax.annotation.Generated;


/**
 * Convenience access to all tables in blocklyprop
 */
@Generated(
	value = {
		"http://www.jooq.org",
		"jOOQ version:3.6.1"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Tables {

	/**
	 * The table blocklyprop.project
	 */
	public static final Project PROJECT = eu.creatingfuture.propeller.blocklyprop.db.generated.tables.Project.PROJECT;

	/**
	 * The table blocklyprop.project_tag
	 */
	public static final ProjectTag PROJECT_TAG = eu.creatingfuture.propeller.blocklyprop.db.generated.tables.ProjectTag.PROJECT_TAG;

	/**
	 * The table blocklyprop.tag
	 */
	public static final Tag TAG = eu.creatingfuture.propeller.blocklyprop.db.generated.tables.Tag.TAG;

	/**
	 * The table blocklyprop.user
	 */
	public static final User USER = eu.creatingfuture.propeller.blocklyprop.db.generated.tables.User.USER;
}
